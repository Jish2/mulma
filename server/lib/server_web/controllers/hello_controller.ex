defmodule ServerWeb.HelloController do
  use ServerWeb, :controller

  def hello(conn, _params) do
    json(conn, %{message: "Hello, World!"})
  end
end
