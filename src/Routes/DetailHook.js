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
    try {
      if (isMovie) {
        ({
          data: resultData,
          data: {
            videos: { results: resultVideos },
          },
        } = await moviesApi.movieDetail(parsedId));
        setResult(resultData);
        setVideos(resultVideos);
      } else {
        ({
          data: resultData,
          data: {
            videos: { results: resultVideos },
          },
        } = await tvApi.tvDetail(parsedId));
        setResult(resultData);
        setVideos(resultVideos);
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
      result={result}
      videos={videos}
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
