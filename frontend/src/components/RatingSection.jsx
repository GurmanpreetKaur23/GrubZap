/* eslint-disable react/prop-types */
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function RatingSection({ onRatingChange }) {
  const [value, setValue] = useState(0);

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
    // console.log("Rating:", value);
    onRatingChange(value);
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography variant="h6" component="legend">
        Your rating:
      </Typography>
      <Rating
        size="large"
        name="simple-controlled "
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onClick={handleClick(SlideTransition)}
      />
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="Your review was sent!"
        key={state.Transition.name}
        autoHideDuration={1200}
      />
    </Box>
  );
}
