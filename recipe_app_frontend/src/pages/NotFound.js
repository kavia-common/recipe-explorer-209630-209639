import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

// PUBLIC_INTERFACE
export default function NotFound() {
  /** 404 page for unknown routes. */
  return (
    <main className="main" role="main">
      <div className="container">
        <Card className="notfound">
          <h1 className="page-title">404 — Page not found</h1>
          <p className="page-subtitle">
            That route doesn’t exist. Head back to the recipe grid and keep cooking.
          </p>
          <Button as={Link} to="/" variant="primary">Go to Home</Button>
        </Card>
      </div>
    </main>
  );
}
