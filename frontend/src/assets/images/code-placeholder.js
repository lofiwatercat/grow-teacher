  // Progress bar
  useEffect(() => {
    // Don't send a request on first show
    if (didMount.current) {
      // Change the item in the post data
      for (let i = 0; i < post.items.length; i++) {
        let arrayItem = post.items[i];
        if (arrayItem._id === item._id) {
          post.items[i].status = itemStatus;
          // Update current progress
          if (itemStatus === true) {
            setCurrentProgress(currentProgress + arrayItem.totalCost);
          } else {
            setCurrentProgress(currentProgress - arrayItem.totalCost);
          }
        }
      }

      // Update the post in the backend, but don't need to update the store
      // because we did that in the for loop already
      dispatch(updatePostNoDispatch(post, post.imageUrl));
    } else {
      didMount.current = true;
    }
  }, [itemStatus]);

