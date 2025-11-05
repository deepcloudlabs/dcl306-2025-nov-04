import Container from "../common/container";
import Card from "../common/card";
import Badge from "../common/badge";
import {Link} from "react-router";

export default function PlayerLoses(){
    return (
      <Container>
          <Card title={"Game Console"}>
              <Badge color={"bg-danger"}
                     value={"Good Game!"}
                     label={"Message"} />
              <Link to={"/"}>Play again?</Link>
          </Card>
      </Container>
    );
}
