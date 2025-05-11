import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import "./style.css";
import profile from '../../assets/images/icons/profilebot.png';

const DBPedia = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState('');
  const [trigger, setTrigger] = useState(false);

  const search = steps.search.value;

  useEffect(() => {
    axios.post(process.env.REACT_APP_CHATBOT_API + '/api/chatbot', { input_text: search })
      .then(response => {
        setResult(response.data.response);
        setLoading(false);
        setIsError(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setIsError(true);
        setResult("Server error: Unable to connect to the bot....\n\n please try again in a while or report to admins if the problem persists");
      });
  }, [search]);

  const triggetNext = (nextStepTrigger) => {
    setTrigger(true);
    setIsError(false);
    triggerNextStep({ trigger: nextStepTrigger });
  };

  return (
    <div className="dbpedia-response-container">
      {loading ? <Loading /> : result}
      {!loading && (
        <div className="dbpedia-options-container">
          {!trigger && (
            <>
              <button className="dbpedia-button dbpedia-ask-another" onClick={() => triggetNext('1')}>
                Ask another question
              </button>
              {isError &&
                <button className="dbpedia-button dbpedia-try-again" onClick={() => triggetNext('re-search')}>
                  Try again
                </button>
              }
            </>
          )}
        </div>
      )}
    </div>
  );
};

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const refinedTheme = {
  background: '#1a1a1a',
  fontFamily: 'Mona sans, Arial, sans-serif',
  headerBgColor: '#1BE985',
  headerFontColor: '#000000',
  headerFontSize: '1.25rem',
  botBubbleColor: '#2d2d2d',
  botFontColor: '#e0e0e0',
  userBubbleColor: '#1BE985',
  userFontColor: '#000000',
};

const Bot = () => {
  const bubbleStyle = {
    fontSize: "1rem",
    fontFamily: "Mona sans, Arial, sans-serif",
    fontWeight: "500",
    lineHeight: "1.5"
  };

  const config = {
    width: "24rem",
    height: "30rem",
    floating: true,
    botAvatar: profile,
    userAvatar: profile,
  };

  return (
    <ThemeProvider theme={refinedTheme}>
      <ChatBot
        headerTitle="CALM Bot"
        bubbleStyle={bubbleStyle}
        {...config}
        steps={[
          {
            id: '1',
            message: 'How Can I help you about Calm?',
            trigger: 'search',
          },
          {
            id: 'search',
            user: true,
            trigger: '4',
          },
          {
            id: 're-search',
            message: ({ previousValue }) => `Trying again with "${previousValue}"`,
            trigger: '4',
          },
          {
            id: '4',
            component: <DBPedia />,
            waitAction: true,
            asMessage: true,
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default Bot;
