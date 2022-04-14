use serde::{Serialize, Deserialize};
use std::str::FromStr;

use crate::infrastructure::data::db_id::DbId;
use crate::domain::story::field::{StoryId, OwnerId};

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryStory(StoryId);

impl QueryStory {
    pub fn into_inner(self) -> StoryId {
        self.0
    }
}

impl FromStr for QueryStory {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(StoryId::from_str(id)?))
    }
}

impl From<DbId> for QueryStory {
    fn from(id: DbId) -> Self {
        Self (StoryId::from(id))
    }
}

impl From<QueryStory> for String {
    fn from(req: QueryStory) -> Self {
        Self::from(req.into_inner().into_inner())
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryStoryCollection(OwnerId);

impl QueryStoryCollection {
    pub fn into_inner(self) -> OwnerId {
        self.0
    }
}

impl From<DbId> for QueryStoryCollection {
    fn from(id: DbId) -> Self {
        Self(OwnerId::from(id))
    }
}

impl From<QueryStoryCollection> for String {
    fn from(req: QueryStoryCollection) -> Self {
        Self::from(req.into_inner().into_inner())
    }
}

impl FromStr for QueryStoryCollection {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(OwnerId::from_str(id)?))
    }
}