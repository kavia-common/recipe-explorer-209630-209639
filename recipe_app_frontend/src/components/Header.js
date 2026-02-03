import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

// PUBLIC_INTERFACE
export function Header({ searchValue, onSearchChange, onClearSearch }) {
  /** App header with brand and global search (shown prominently on all pages). */
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Go to home">
          <span className="brand-badge" aria-hidden="true" />
          <span className="brand-text">
            <span className="brand-title">Retro Recipe Explorer</span>
            <span className="brand-subtitle">Browse • Search • Cook</span>
          </span>
        </Link>

        <div className="search-wrap" role="search" aria-label="Search recipes">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="recipe-search">Search recipes</label>
          <Input
            id="recipe-search"
            className="search-input"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search recipes, tags, ingredients…"
            inputMode="search"
            autoComplete="off"
            aria-describedby="search-hint"
          />
          <span id="search-hint" className="sr-only">
            Type to filter recipes on the home page. Press Escape to clear.
          </span>
        </div>

        <div className="header-actions">
          {searchValue ? (
            <Button
              variant="ghost"
              size="small"
              onClick={onClearSearch}
              aria-label="Clear search"
              type="button"
            >
              Clear
            </Button>
          ) : null}

          {!isHome ? (
            <Button as={Link} to="/" variant="primary" size="small">
              Home
            </Button>
          ) : (
            <Button as="a" href="#recipes" variant="primary" size="small">
              Browse
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
