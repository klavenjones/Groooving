import React from 'react';

import './App.css';


import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';





class App extends React.Component {

  constructor(props){
     
    super(props);
     
     this.state = {
       searchResults: [],
       playListName: 'New Playlist',
       playlistTracks: []

      };
     
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlayListName = this.updatePlayListName.bind(this);
     this.savePlayList = this.savePlayList.bind(this);
     this.search = this.search.bind(this);

  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addTrack(track){
      
    let tracks = this.state.playlistTracks;
    tracks.push(track);
     
     this.setState({
          playlistTracks: tracks
      });
  }



  removeTrack(track){
      
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    
    
     this.setState({
          playlistTracks: tracks
      });
  }

  updatePlayListName(title){
      this.setState({  
         playListName: title
      });
  }

  savePlayList(){
      const trackURI = this.state.playlistTracks.map(track => track.uri);
      
      Spotify.savePlaylist(this.state.playListName, trackURI).then(() => {
        this.setState({
          playListName: 'New Playlist' ,
          playlistTracks: []
         
        });
      });
  }

 

  render() {
    return (
          <div>
            <div className="overlay"></div>
            <h1>Gr<span className="highlight">ooo</span>ving</h1>
            <div className="App">
                <SearchBar onSearch={this.search} />
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}  />
                <PlayList playListName={this.state.playListName} playlistTracks={this.state.playlistTracks} onSave={this.savePlayList} onNameChange={this.updatePlayListName} onRemove={this.removeTrack} />
              </div>
           </div>
          
           
         </div>

    );
  }
}

export default App;
