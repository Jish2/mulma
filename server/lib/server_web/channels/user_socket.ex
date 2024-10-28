defmodule ServerWeb.UserSocket do
  use Phoenix.Socket

  channel "time:*", ServerWeb.TimeChannel

  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
