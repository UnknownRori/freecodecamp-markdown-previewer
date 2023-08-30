import DOMPurify from "dompurify";
import { useCallback, useContext, useEffect, useState } from "react";
import { parse } from "marked";

import { EditorContext } from "./Editor";

export function Preview() {
  const editor = useContext(EditorContext);
  const [html, setHTML] = useState("");

  const parser = useCallback(async (content: string) => {
    const result = parse(content, {
      breaks: true,
    });
    const sanitized = DOMPurify.sanitize(result);
    setHTML(sanitized);
  }, []);

  useEffect(() => {
    parser(editor.content);
  }, [editor])

  return (
    <div id="preview" dangerouslySetInnerHTML={{ __html: html }}
      className="prose lg:prose-xl rounded p-2 border-2 border-gray-200 min-w-full"></div >
  )
}
