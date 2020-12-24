import React, { useState, useEffect } from "react";
import { moviesApi, tvApi } from "../api";
import PropTypes from "prop-types";
import ShowDetail from "./ShowDetail";

const DetailHook = (props) => {
  const {
    location: { pathname },
  } = props;
  const isMovie = pathname.includes("/movie/");
  // init Hook state
  const [result, setResult] = useState(null);
  const [videos, setVideos] = useState(null);
  const [casts, setCasts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getDetail() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = props;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let resultData = null;
    let resultVideos = null;
    let resultCasts = null;
    try {
      if (isMovie) {
        ({
          data: resultData,
          data: {
            videos: { results: resultVideos },
            credits: { cast: resultCasts },
          },
        } = await moviesApi.movieDetail(parsedId));
        setResult(resultData);
        setVideos(resultVideos);
        setCasts(resultCasts);
      } else {
        ({
          data: resultData,
          data: {
            videos: { results: resultVideos },
            credits: { cast: resultCasts },
          },
        } = await tvApi.tvDetail(parsedId));
        setResult(resultData);
        setVideos(resultVideos);
        setCasts(resultCasts);
      }
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <ShowDetail
      isMovie={isMovie}
      result={result}
      videos={videos}
      casts={casts}
      error={error}
      loading={loading}
    ></ShowDetail>
  );
};

ShowDetail.propTypes = {
  result: PropTypes.object,
  videos: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailHook;
