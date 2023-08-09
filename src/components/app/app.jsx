import React from "react";
import Navigation from "../navigation/navigation";
import { GenreProvider } from "../castomHuks/genre-context";
import { RatedProvider } from '../castomHuks/rated-context';
import { useOnlineOfline } from '../castomHuks/useOnlineOfline';

const App = () => {
  const isOnline = useOnlineOfline();

  return (
    isOnline ? (
      <GenreProvider>
        <RatedProvider>
          <div>
            <Navigation />
          </div>
        </RatedProvider>
      </GenreProvider>
    ) : (
      <div className="offline-message">
        <h1>Offline</h1>
        <p>Please check your internet connection and try again.</p>
        <div className="imageOfline" />
      </div>
    )
  );
};

export default App;
