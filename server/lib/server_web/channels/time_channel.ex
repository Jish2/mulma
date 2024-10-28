defmodule ServerWeb.TimeChannel do
  use Phoenix.Channel

  def join("time:stream", _message, socket) do
    # Start the timer when client joins
    :timer.send_interval(1000, :tick)
    {:ok, socket}
  end

  def handle_info(:tick, socket) do
    time = Time.utc_now() |> Time.to_string()
    push(socket, "new_time", %{time: time})
    {:noreply, socket}
  end
end
