import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Icon, Button,
} from 'antd';
import Music from '../../../../utils/music';

export default class ImageList extends React.Component {
  static propTypes = {
    defaultList: PropTypes.array.isRequired,
    fetchMusicList: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { defaultList = [] } = props;
    this.state = {
      list: [...defaultList],
      play: false,
    };
    this.musicHandler = new Music();
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    const { defaultList = [], fetchMusicList } = this.props;
    if (fetchMusicList) {
      fetchMusicList().then((res) => {
        this.setState({ list: [...defaultList].concat(res), play: false });
      });
    }
  }

  onPlay = obj => () => {
    this.setState({ play: obj });
    this.musicHandler.setSrc(obj.url);
  }

  onStop = () => {
    this.setState({ play: false });
    this.musicHandler.pause();
  }

  onItemClick = obj => () => {
    this.onStop();
    const { onSelect } = this.props;
    onSelect(obj.url);
  }

  render() {
    const { list, play } = this.state;
    return (
      <Row className="music-list">
        {
            list.map(it => (
              <Col span={12} key={it.url} className="item">
                <Row type="flex" justify="space-between">
                  <Col>
                    {it.name}
                  </Col>
                  <Col>
                    {
                      play && play.url === it.url ? <Icon type="pause-circle" onClick={this.onStop} /> : <Icon type="play-circle" onClick={this.onPlay(it)} />
                    }
                    <Button type="primary" size="small" onClick={this.onItemClick(it)}>使用</Button>
                  </Col>
                </Row>
              </Col>
            ))
        }
      </Row>
    );
  }
}
