// searchBar `/api/posts/search/${query}`
router.get("/search/:query", (req, res) => {
  Post.find({
    $or: [
      { title: { $regex: req.params.query, $options: "i" } },
      { authorName: { $regex: req.params.query, $options: "i" } },
    ],
  })
    .then((posts) => {
      return res.json(posts);
    })
    .catch((err) =>
      res.status(404).json({ nopostsfound: "No posts found with that query" })
    );
});


