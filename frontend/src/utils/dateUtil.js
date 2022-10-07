export const cuteTimeAgo = (timeAsString) => {
  const rightNow = new Date();
  const timeDiffInSeconds = Math.ceil(
    (rightNow - new Date(timeAsString)) / 1000
  );

  if (timeDiffInSeconds < 60) return String(timeDiffInSeconds) + "s";
  if (timeDiffInSeconds < 3600)
    return String(Math.ceil(timeDiffInSeconds / 60)) + "m";
  if (timeDiffInSeconds < 86400)
    return String(Math.ceil(timeDiffInSeconds / 3600)) + "h";
  if (timeDiffInSeconds >= 86400)
    return String(Math.ceil(timeDiffInSeconds / 86400)) + "d";
};

export const dayTimeAgo = (timeAsString) => {
  const rightNow = new Date();
  const timeDiffInSeconds = Math.ceil(
    (rightNow - new Date(timeAsString)) / 1000
  );

  return String(Math.ceil(timeDiffInSeconds / 86400)) + " day(s)";
};
