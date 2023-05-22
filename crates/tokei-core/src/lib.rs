#![deny(clippy::all)]
mod lang;
use lang::LangType;
use napi_derive::napi;
use std::env;
use tokei::{Config, Languages};
#[napi(object)]
pub struct LangInfo {
  pub lang: String,
  pub lines: u32,
  pub code: u32,
  pub comments: u32,
  pub blanks: u32,
}
#[napi(object)]
pub struct Report {
  pub name: String,
  pub status: Vec<CodeStatus>,
}
#[napi(object)]
pub struct CodeStatus {
  pub blanks: u32,
  pub code: u32,
  pub comments: u32,
}

#[napi(object)]
pub struct TokeiOptions {
  pub include: Option<Vec<String>>,
  pub exclude: Option<Vec<String>>,
  pub languages: Option<Vec<String>>,
}

#[napi]
pub fn tokei(options: TokeiOptions) -> Vec<LangInfo> {
  let config = Config::default();
  let mut languages = Languages::new();

  let langs: Option<Vec<LangType>> = options
    .languages
    .map(|lang_type| lang_type.iter().map(|s| LangType::from(&**s)).collect());
  languages.get_statistics(
    &options
      .include
      .unwrap_or_else(|| vec![env::current_dir().unwrap().to_string_lossy().to_string()]),
    &options
      .exclude
      .unwrap_or_else(|| vec![])
      .iter()
      .map(|s| &**s)
      .collect::<Vec<&str>>(),
    &config,
  );
  let mut res: Vec<LangInfo> = vec![];
  if let Some(langs) = langs {
    langs.iter().for_each(|lang_type| {
      let lang = &languages[&**lang_type];
      res.push(LangInfo {
        lang: lang_type.to_string(),
        lines: (lang.lines() as u32),
        code: (lang.code as u32),
        comments: (lang.comments as u32),
        blanks: (lang.blanks as u32),
      })
    })
  } else {
    for lang in languages.into_iter() {
      res.push(LangInfo {
        lang: lang.0.to_string(),
        lines: (lang.1.lines() as u32),
        code: (lang.1.code as u32),
        comments: (lang.1.comments as u32),
        blanks: (lang.1.blanks as u32),
      })
    }
  }

  res
}
