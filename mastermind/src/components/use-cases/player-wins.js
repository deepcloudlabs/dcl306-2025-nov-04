import Container from "../common/container";
import Card from "../common/card";
import Badge from "../common/badge";
import {Link} from "react-router";

export default function PlayerWins(){
    return (
      <Container>
          <Card title={"Game Console"}>
              <Badge color={"bg-success"}
                     value={"Congrats!"}
                     label={"Message"} />
              <Link to={"/"}>Play again?</Link>
          </Card>
      </Container>
    );
}
