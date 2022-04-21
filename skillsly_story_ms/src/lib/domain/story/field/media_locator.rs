use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MediaLocator(Option<String>);

impl MediaLocator {
    pub fn new(media_locator: &str) -> Self {
        Self(Some(media_locator.to_owned()))
    }

    pub fn into_inner(self) -> String {
        match self.0 {
            Some(description) => description,
            None => String::from("")
        }
    }
}