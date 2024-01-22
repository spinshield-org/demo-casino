<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Opekunov\Centrifugo\Centrifugo;
use Illuminate\Support\Facades\Auth;
class TestEventBalanceUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:balance-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(Centrifugo $centrifugo)
    {
        $id = $this->ask("User id?", 2);
        $user_model = new \App\Models\User;
        $user = $user_model->where("id", $id)->first();
        $currencyData = array(
          "usd" => $user->usd,
          "eur" => $user->eur,
          "gbp" => $user->gbp,
        );
        \App\Events\BalanceUpdateEvent::dispatch($currencyData, 'personal:#'.$id);
        return self::SUCCESS;
    }
  }