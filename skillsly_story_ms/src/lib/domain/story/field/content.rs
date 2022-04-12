use serde::{Deserialize, Serialize};

use crate::domain::story::field::{Description, MediaLocator};
use crate::domain::story::StoryError;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Content {
    pub description: Description,
    pub media_locator: MediaLocator
}

impl Content {
    pub fn new(description: &str, media_locator: &str) -> Result<Self, StoryError> {
        if !description.trim().is_empty() || !media_locator.trim().is_empty() {
            return Ok(Self {
                description: Description::new(description),
                media_locator: MediaLocator::new(media_locator)
            });
        }
        Err(StoryError::InvalidContent)
    }
}
