import useI18N from "components/internationalization/i18n";
import { useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import AxiosInstance from "scripts/axioInstance";

const UpdateRoom = ({ setWarning, setSuccess, doctorId, room }) => {
  const { text, isBaseReady } = useI18N();
  const [roomText, setRoomText] = useState(room);
  const [editing, setEditing] = useState(false);
  const handleUpdate = () => {
    if (editing === false) {
      setEditing(true);
      return;
    }
    const data = {
      doctorId: doctorId,
      room: roomText,
    };
    AxiosInstance.post(`http://localhost:7200/rooms/allocate`, data)
      .then((response) => {
        setSuccess(
          text("rooms-update-successful", "Room updated succesfully.")
        );
        setEditing(false);
      })
      .catch((error) => {
        setWarning(text("rooms-update-failed", "Failed to update room."));
      });
  };
  return (
    <>
      <td>
        {editing ? (
          <>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i style={{ color: "#777" }} className="fa fa-building" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  style={{ color: "#777" }}
                  placeholder={text("rooms-allocate", "Set a room for doctor")}
                  type="email"
                  autoComplete="new-email"
                  value={roomText !== null ? roomText : ""}
                  onChange={(e) => setRoomText(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
          </>
        ) : roomText ? (
          roomText
        ) : (
          text("rooms-allocate", "Set a room for doctor")
        )}
      </td>
      <td>
        {editing ? (
          <>
            <Button onClick={handleUpdate}>Save</Button>
            <Button
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={handleUpdate}>Edit</Button>
        )}
      </td>
    </>
  );
};

export default UpdateRoom;
