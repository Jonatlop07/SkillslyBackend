pub mod field;

use serde::{Serialize, Deserialize};

#[derive(Debug, thiserror::Error)]
pub enum StoryError {
    #[error("neither description nor media resource was provided")]
    InvalidContent,
    #[error("invalid date: {0}")]
    InvalidDate(String),
    #[error("date parse error: {0}")]
    DateParse(#[from] chrono::ParseError),
    #[error("id parse error: {0}")]
    Id(#[from] uuid::Error),
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Story {
    pub story_id: field::StoryId,
    pub owner_id: field::OwnerId,
    pub content: field::Content,
    pub created_at: field::CreatedAt
}