#![deny(clippy::all)]

use napi_derive::napi;
use tokei::{Config, LanguageType, Languages};

#[napi]
pub fn tokei() {
  let paths = &["src", "packages"];
  let excluded = &["node_modules"];
  let config = Config::default();
  let mut languages = Languages::new();
  languages.get_statistics(paths, excluded, &config);
  let rust = &languages[&LanguageType::Rust];
  println!("Lines of code: {}", rust.code);
}
