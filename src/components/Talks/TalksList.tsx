import React from "react";
import TalkDisplay from "./TalkDisplay";
import styled from "@emotion/styled";
import Link from "next/link";
import Julie from "../../assets/Julie.png";
import Nathan from "../../assets/Nathan.png";
import Alex from "../../assets/Alex.png";
import Angélique from "../../assets/Angélique.png";
import Tom from "../../assets/Tom.png";

function TalksList() {
	return (
		<TalksListGlobal>
			<Link href="/messages">
				<TalkDisplay
					name="Alex"
					picture={Alex}
					content="Du coup, tu es interessé ?"
					date="05/01/2023"
					hour="18:43"
					owner=""
				/>
			</Link>
			<Link href="/messages">
				<TalkDisplay
					name="Nathan"
					picture={Nathan}
					content="Impressionnant !"
					date="28/12/2022"
					hour="14:11"
					owner="Vous :"
				/>
			</Link>
			<Link href="/messages">
				<TalkDisplay
					name="Julie"
					picture={Julie}
					content="D'accord, à la prochaine !"
					date="31/12/2022"
					hour="12:08"
					owner=""
				/>
			</Link>
			<Link href="/messages">
				<TalkDisplay
					name="Tom"
					picture={Tom}
					content="Merci, bon voyage :)"
					date="24/12/2022"
					hour="20:33"
					owner=""
				/>
			</Link>
			<Link href="/messages">
				<TalkDisplay
					name="Angélique"
					picture={Angélique}
					content="Ciao !"
					date="23/12/2022"
					hour="19:21"
					owner=""
				/>
			</Link>
			{/* 
      {[...Array(5)].map((item, index) => {
        return (
          <Link key={index} href="/messages">
            <TalkDisplay />
          </Link>
        );
      })}
       */}
		</TalksListGlobal>
	);
}

export default TalksList;

const TalksListGlobal = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`;
