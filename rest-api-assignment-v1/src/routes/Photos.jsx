import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useeffect ini akan berjalan ketika ada perubahan di sort, submited dan refresh
  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true);
  //     try {
  //       const queryParams = { _sort: "id", _order: `${sort}`, q: `${submited}` };
  //       const searchParams = new URLSearchParams(queryParams);
  //       const response = await fetch(`http://localhost:3001/photos?${searchParams}`);
  //       const responseJson = await response.json();
  //       setPhotos(responseJson);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setError(true);
  //     }
  //   };
  //   loadData();
  // }, [sort, submited]);
  useEffect(() => {
    const queryParams = new URLSearchParams({ _sort: "id", _order: `${sort}`, q: `${submited}` });
    fetch(`http://localhost:3001/photos?${queryParams}`)
      .then((response) => response.json())
      .then((json) => {
        setPhotos(json);
        setLoading(false);
      });

    // TODO: answer here
  }, [sort, submited]);

  // useeffect ini akan berjalan pertamakali sebelelum element jsx
  // useEffect(() => {
  //   setLoading(true);
  //   const loadData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/photos");
  //       const responseJson = await response.json();
  //       setPhotos(responseJson);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setError(true);
  //       setLoading(false);
  //     }
  //   };
  //   loadData();
  // }, []);
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        fetch(`http://localhost:3001/photos`)
          .then((response) => response.json())
          .then((json) => {
            setPhotos(json);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>Error!</h1>;

  return (
    <>
      <Box className="container">
        <Box className="options">
          <select onChange={(e) => setSort(e.target.value)} data-testid="sort" className="form-select" style={{}}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input type="text" data-testid="search" onChange={(e) => setSearch(e.target.value)} className="form-input" />
            <input type="submit" value="Search" data-testid="submit" className="form-btn" />
          </form>
        </Box>
        <Box className="content">
          {loading ? (
            <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>Loading...</h1>
          ) : (
            photos.map((photo) => {
              return <Card key={photo.id} photo={photo} />;
            })
          )}
        </Box>
      </Box>
    </>
  );
};

export default Photos;
