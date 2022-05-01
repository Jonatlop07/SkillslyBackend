use serde::{Serialize, Deserialize};
use std::str::FromStr;

use crate::infrastructure::data::db_id::DbId;
use crate::domain::story::field::Id;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct QueryStoryWithViews {
    pub story_id: Id,
    pub viewer_id: Id
}

impl QueryStoryWithViews {
    pub fn new(story_id: Id, viewer_id: Id) -> Self {
        Self {
            story_id,
            viewer_id
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct QueryStory(Id);

impl QueryStory {
    pub fn into_inner(self) -> Id {
        self.0
    }
}

impl FromStr for QueryStory {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(Id::from_str(id)?))
    }
}

impl From<DbId> for QueryStory {
    fn from(id: DbId) -> Self {
        Self (Id::from(id))
    }
}

impl From<QueryStory> for String {
    fn from(req: QueryStory) -> Self {
        Self::from(req.into_inner().into_inner())
    }
}

impl From<QueryStoryWithViews> for QueryStory {
    fn from(req: QueryStoryWithViews) -> Self {
        Self(req.story_id)
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct QueryStoryCollection(Id);

impl QueryStoryCollection {
    pub fn into_inner(self) -> Id {
        self.0
    }
}

impl From<DbId> for QueryStoryCollection {
    fn from(id: DbId) -> Self {
        Self(Id::from(id))
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
        Ok(Self(Id::from_str(id)?))
    }
}