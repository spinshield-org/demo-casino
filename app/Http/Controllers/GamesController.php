<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\SpinshieldController;

class GamesController extends Controller
{
  function __construct()
  {
    $this->allowed_currencies = array("usd", "eur", "brl", "gbp");
    $this->api_controller = new SpinshieldController;
  }

  public function getFreeRounds($username, $password, $currency)
  {
    $controller = $this->api_controller;
    $fr = $controller->getFreeRounds($username, $password, $currency);
    return $fr;
  }

  public function gamesList()
  {
    $games = Cache::get("gamesList");
    if(!$games) {
      $controller = $this->api_controller;
      $timer = now()->addMinutes(2);
      $games = $controller->getGameList()->all();
      shuffle($games);
      Cache::set("gamesList", $games, $timer);
    }
    return $games;
  }

  public function launch(Request $request, $currency, $provider, $game)
  {
    $user = $request->user();
    $user_id = $user->id;
    
    if($currency === "demo") {
      $currency = 'usd';
      $play_for_fun = 1;
    } else {
      if(!in_array($currency, $this->allowed_currencies)) {
        return "currency not supported";
      }
      $play_for_fun = 0;
    }

    $response = $this->api_controller->openGame($user_id, $provider.'/'.$game, $currency, $play_for_fun);
    
    if(isset($response['error'])) {
      if($response['error'] === 0) {
        return redirect($response['response']);
      } else {
        return $response;
      }
    } else {
      return $response;
    }
  }

}


