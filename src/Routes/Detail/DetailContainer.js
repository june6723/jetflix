import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      videos: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let videos = null;
    try {
      if (isMovie) {
        ({
          data: result,
          data: {
            videos: { results: videos },
          },
        } = await moviesApi.movieDetail(parsedId));
      } else {
        ({
          data: result,
          data: {
            videos: { results: videos },
          },
        } = await tvApi.tvDetail(parsedId));
      }
      console.log(result);
      console.log(videos);
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, videos });
    }
  }

  render() {
    const { result, videos, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        videos={videos}
        error={error}
        loading={loading}
      />
    );
  }
}
