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
      <Link className="post-index-item" to={`/posts/${post._id}`}>
        <Card sx={{ maxWidth: 340, height: 300 }} className="post-index-item-card">
          <CardMedia component="img" height="170" image={post.imageUrl} alt="post" />
          <CardContent className="card-profile-content">
            <Typography sx={{ textDecoration: "none" }} className="card-profile-text" gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component={'span'}>
              <ProgressBar now={(currentProgress / totalCost) * 100} />
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default ProfilePostItem;

