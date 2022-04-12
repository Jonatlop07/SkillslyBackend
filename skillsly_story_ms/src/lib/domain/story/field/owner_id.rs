use std::str::FromStr;
use crate::infrastructure::data::db_id::DbId;
use derive_more::Constructor;
use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Constructor, Serialize, Deserialize)]
pub struct OwnerId(DbId);

impl OwnerId {
    pub fn into_inner(self) -> DbId {
        self.0
    }
}

impl From<DbId> for OwnerId {
    fn from(id: DbId) -> Self {
        Self(id)
    }
}

impl FromStr for OwnerId {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(DbId::from_str(id)?))
    }
}