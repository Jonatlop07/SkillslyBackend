use serde::{Serialize, Deserialize};

use crate::domain::story::field::{Description, MediaLocator, OwnerId};

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateStory {
    pub owner_id: OwnerId,
    pub description: Description,
    pub media_locator: MediaLocator
}
