use derive_more::Constructor;
use serde::{Serialize, Deserialize};
use std::str::FromStr;

use crate::infrastructure::data::db_id::DbId;

#[derive(Clone, Debug, Constructor, Eq, PartialEq, Serialize, Deserialize)]
pub struct Id(DbId);

impl Id {
    pub fn into_inner(self) -> DbId {
        self.0
    }
}

impl From<DbId> for Id {
    fn from(id: DbId) -> Self {
        Self(id)
    }
}

impl Default for Id {
    fn default() -> Self {
        Self(DbId::nil())
    }
}

impl FromStr for Id {
    type Err = uuid::Error;

    fn from_str(id: &str) -> Result<Self, Self::Err> {
        Ok(Self(DbId::from_str(id)?))
    }
}

impl From<Id> for String {
    fn from(id: Id) -> Self {
        Self::from(id.into_inner())
    }
}