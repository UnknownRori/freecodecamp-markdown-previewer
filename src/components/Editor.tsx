import React, { createContext, useContext, useState } from "react";

export type EditorContextType = {
  content: string,
  updateContent?: (newContent: string) => void,
};

export const EditorContext = createContext<EditorContextType>({
  content: "",
});

type EditorProviderProps = {
  content?: string
} & React.PropsWithChildren;

export function EditorProvider(props: EditorProviderProps) {
  const [text, setText] = useState(props.content ?? "# Hello, World");

  const contextValue = {
    content: text,
    updateContent: function(newContent: string) {
      console.log(`update : ${newContent}`)
      setText(newContent);
    },
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {props.children}
    </EditorContext.Provider>
  );
}


export function Editor() {
  const { content, updateContent } = useContext(EditorContext);

  function updateText(newContent: string) {

    if (newContent == null) {
      console.error("Something went wrong, and probably user fault");
      return;
    }

    if (updateContent == undefined) {
      console.error("Woops");
      return;
    }

    updateContent(newContent);
  }

  return (
    <textarea onChange={(event) => updateText(event.target.value)} id="editor"
      defaultValue={content}
      className="border-2 border-gray-2 min-h-[40vh] w-full rounded p-2"></textarea>
  )
}
