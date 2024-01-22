<?php
// App/Events/SendMessageEvent.php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\Channel;

//Use "implements ShouldBroadcast" if you want add event to queue
class BalanceUpdateEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var string Message text
     */
    private $currencyData;
    private $channel;

    public function __construct(array $currencyData, string $channel)
    {
        $this->currencyData = $currencyData;
        $this->channel = $channel;

    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        //example event broadcast name. Show in Web Socket JSON
        return 'BalanceUpdate';
    }


    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return ['message' => $this->currencyData];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $channel = $this->channel;
        return new PrivateChannel($this->channel);
        // or return new PrivateChannel('private:chat');
        // in Centrifuge 4 all channels are protected, and the '$' prefix is considered obsolete. https://centrifugal.dev/docs/server/channels#private-channel-prefix-
    }
}