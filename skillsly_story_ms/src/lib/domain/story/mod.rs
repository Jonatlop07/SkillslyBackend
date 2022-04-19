pub mod field;

use std::cell::RefCell;
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
    pub story_id: field::Id,
    pub owner_id: field::Id,
    pub content: field::Content,
    pub created_at: field::CreatedAt,
    pub views: RefCell<Vec<StoryView>>
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct StoryView {
    pub story_id: field::Id,
    pub viewer_id: field::Id,
    pub viewed_at: field::ViewedAt
}