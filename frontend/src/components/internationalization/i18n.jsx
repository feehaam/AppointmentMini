import { useState, useEffect } from "react";
import AxiosInstance from "scripts/axioInstance";

const useI18N = () => {
  const [base, setBase] = useState({});
  const [isBaseReady, setIsBaseReady] = useState(false);

  useEffect(() => {
    const url = "http://localhost:5400/v1/language/resources/map";
    AxiosInstance.get(url)
      .then((result) => {
        // console.log(result.data);
        setBase(result.data);
        setIsBaseReady(true);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const text = (tag, alternative) => {
    const language = localStorage.getItem("language")
    const tagData = base[tag];

    if (tagData && tagData.translations) {
      const translation = tagData.translations[language];
      if (translation && translation.localizedText) {
        return translation.localizedText;
      }
    }

    // Check if base[tag] is defined
    if (!base[tag]) {
      // If not defined, add the entire result data for the resource
      requestTranslation(tag, alternative, (updatedTranslations) => {
        setBase((prevBase) => ({
          ...prevBase,
          [tag]: updatedTranslations,
        }));
      });
    } else {
      requestTranslation(tag, alternative, (updatedTranslations) => {
        // If defined, update only the translations
        setBase((prevBase) => ({
          ...prevBase,
          [tag]: {
            ...prevBase[tag],
            translations: updatedTranslations,
          },
        }));
      });
    }

    // console.log("Returning the alternative text", alternative);
    return alternative;
  };

  const requestTranslation = (tag, alternative, callback) => {
    // console.log("Translation request in progress for", alternative);
    const url = `http://localhost:5400/v1/language/resources/map/${tag}/alternate/${alternative}`;
    AxiosInstance.get(url)
      .then((result) => {
        // console.log("received new translation", result);
        callback(result.data.translations);
      })
      .catch((error) => {
        // console.log("error on request", error);
      });
    // console.log("returning request process");
  };

  return { text, isBaseReady };
};

export default useI18N;
