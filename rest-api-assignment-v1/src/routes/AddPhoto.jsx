import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fungsi ini akan menambakan data menggunakan http method yakni POST
  // Data yang kita kirimkan adalah inputan yang sudah dilakuakn pada page addphoto
  // fetch(`http://localhost:3001/photos`)
  //         .then((response) => response.json())
  //         .then((json) => {
  //           setPhotos(json);
  //           setLoading(false);
  //         });
  const addPhoto = async (e) => {
    e.preventDefault();
    if (secret === "password") {
      await fetch(`http://localhost:3001/photos`, {
        method: "POST",
        body: JSON.stringify({ imageUrl, captions, secret, createdAt: "CreatedData", updatedAt: "UpdateData" }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());

      // await fetch("http://localhost:3001/photos", {
      //   method: "POST",
      //   body: JSON.stringify({ imageUrl, captions, secret, createdAt: "12/02/03", updatedAt: "22/12/2022" }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      navigate("/photos");
    } else {
      setError("You are not authorized");
    }
  };

  return (
    <>
      <Box className="container">
        {error && (
          <Box className="error-msg" color="white">
            {error}
          </Box>
        )}
        <form className="add-form" onSubmit={addPhoto}>
          <label>
            Image Url:
            <input className="add-input" type="text" data-testid="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </label>
          <label>
            Captions:
            <input className="add-input" type="text" data-testid="captions" value={captions} onChange={(e) => setCaptions(e.target.value)} />
          </label>
          <label>
            Secret:
            <input className="add-input" type="text" value={secret} data-testid="secret" onChange={(e) => setSecret(e.target.value)} />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </Box>
    </>
  );
};

export default AddPhoto;
