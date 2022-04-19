use std::str::FromStr;
use serde::{Serialize, Deserialize};
use crate::domain::story::field::Id;

#[derive(Debug, Serialize, Deserialize)]
pub struct DeleteStory(Id);

impl DeleteStory {
    fn into_inner(self) -> Id {
        self.0
    }
}

impl From<DeleteStory> for String {
    fn from(req: DeleteStory) -> Self {
        Self::from(req.into_inner())
    }
}

impl FromStr for DeleteStory {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(Id::from_str(id)?))
    }
}