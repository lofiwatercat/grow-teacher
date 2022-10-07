import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./ProfilePostItem.scss";

import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";


// Receieves a post from profile
const ProfilePostItem = ({ post }) => {

  const calcCurrentProgress = () => {
    // A counter to set the current progress to
    let amount = 0;
    for (let i = 0; i < post.items.length; i++) {
      let arrayItem = post.items[i];
      if (arrayItem.status) {
        amount += arrayItem.totalCost;
      }
    }
    // console.log(amount);
    return amount;
  };

  let currentProgress = calcCurrentProgress();

  // Total cost of all the items, or goal of the post
  let totalCost = 0;

  post.items.forEach((item) => {
    totalCost += item.totalCost;
  });


  return (
    <>
      <Link className="post-profile-item" to={`/posts/${post._id}`}>
        <Card sx={{ maxWidth: 340, height: 250 }}>
          <CardMedia component="img" height="170" image={post.imageUrl} alt="post" />
          <CardContent>
            <Typography sx={{ textDecoration: "none" }} className="card-text" gutterBottom variant="h5" component="div">
              {post.title}
              <ProgressBar now={(currentProgress / totalCost) * 100} />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.author_name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default ProfilePostItem;

