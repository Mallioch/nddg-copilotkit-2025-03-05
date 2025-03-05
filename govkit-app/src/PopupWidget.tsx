import { CopilotPopup } from "@copilotkit/react-ui";
 
export default function PopupWidget() {
  return (
    <>
      <CopilotPopup
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "I am a cool popup! Need any help?",
        }}
      />
    </>
  );
}