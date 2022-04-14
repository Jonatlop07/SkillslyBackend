use crate::domain::time::Time;
use serde::{Serialize, Deserialize};
use derive_more::Constructor;

#[derive(Clone, Constructor, Debug, Serialize, Deserialize)]
pub struct CreatedAt(Time);

impl CreatedAt {
    pub fn into_inner(self) -> Time {
        self.0
    }
}