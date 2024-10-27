defmodule ServerWeb.HealthController do
  use ServerWeb, :controller

  def check(conn, _params) do
    json(conn, %{status: "ok"})
  end
end
