import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Paper from "@mui/material/Paper";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import {ThemeProvider} from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

const address = "https://courtneygenix.herokuapp.com"
// const address ="http://localhost:5000"

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const normaltext = {
  fontSize: "12px",
};

const dangar = {
  color: "red",
  fontSize: "12px",
};

/**
<CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
 */

export default function BasicCard({setDate, date, info, sleepRating}) {

    
  var tempRating = null;
  const [refresh, setRefresh] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    console.log("BULLSHIT: ", sleepRating)
    setRating(sleepRating);
  }, [sleepRating])

  useEffect(() => {
    editSleep();
  }, [rating])

  const editSleep = async event => {
    try {
      
      console.log("Info: ", info)
      var obj = {
        email: info.email,
        date: new Date(date).toISOString().slice(0,10),
        rating: rating
      }
      var js = JSON.stringify(obj)
      console.log("JSON: ", js)

      const response = await fetch(
        address + "/api/edit-client-sleep",
        {
          method: "PATCH",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      var txt = await response.text();
      var res = JSON.parse(txt);
        
      if (res.error.length > 0) {
        console.log("API Error: " + res.error);
      } else {
        console.log("Sleep acquired");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper
      sx={{
        position: 'relative',
        p: 2,
        margin: "4px 0px 0px 4px",
        flexGrow: 1,
        borderColor: "gray",
      }}
      variant="outlined"
    >
      <Box sx={{display: 'flex', position: 'absolute', top: 20, left: 30, width: '50%', height: '100px' }}>
        <Typography variant="header2" gutterBottom style={{ fontWeight: "bold", fontSize: 24 }}>
          Sleep
        </Typography>
      </Box>
      <Box sx={{display: 'flex', position: 'absolute', bottom: 120, left: 25, width: '50%',}}>
        <Rating
          name="size-large"
          size="large"
          // precision={0.1}
          sx={{ fontSize: 42 }}
          value={rating}
          readOnly
        />
      </Box>
      
    </Paper>
  );
}
