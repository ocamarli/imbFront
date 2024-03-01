import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./Container";

function TextWithTags(props) {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Container cardsA={props}></Container>
      </DndProvider>
    </div>
  );
}

export default TextWithTags;
