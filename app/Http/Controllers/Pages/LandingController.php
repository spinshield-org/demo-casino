<?php

namespace App\Http\Controllers\Pages;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GamesController;

class LandingController extends \App\Http\Controllers\Controller
{
    function __construct()
    {
      $this->games_controller = new GamesController;
    }

    public function show(Request $request)
    {
        $defaultFilter = "";
        $games = $this->games_controller->gamesList();

        if($request->filter) {
            if($request->filter === "freeSpins") {
                $defaultFilter = "freeSpins";
            }
            if($request->filter === "featureBuy") {
                $defaultFilter = "featureBuy";
            }
        } 
        $freeRounds = [];
        if($request->user()) {
            $user = $request->user();
            $user_id = $user->id;
            $currency = "usd";
            $username = $user_id.':'.$currency;
            $password = md5($user_id);
            $getFreeRounds = $this->games_controller->getFreeRounds($username, $password, $currency);
            try {
            if(isset($getFreeRounds['error'])) {
                if($getFreeRounds['error'] === 0) {
                    $freeRounds = array(
                        "error" => 0,
                        "message" => "",
                        "fr" => $getFreeRounds,
                    );
                    $freeRounds["fr_left"] = $getFreeRounds['response'];
                } else {
                    $freeRounds = array(
                        "error" => 1,
                        "message" => $getFreeRounds['message'],
                        "fr" => [],
                    );
                }
            }
        } catch(\Exception $e) {
            $freeRounds = array(
                "error" => 1,
                "message" => $e->getMessage(),
                "fr" => [],
            );
        }
        }

        return Inertia::render('Casino', [
            'canLogin' => Route::has('login'),
            'games' => $games,
            'showOptions' => [
                "cdnServers" => config("games.cdnServers"),
                "freeRounds" => $freeRounds,
                "defaultFilter" => $defaultFilter,
                "showAuthButtons" => ($request->user() ? true : false),
            ],
            'canRegister' => Route::has('register'),
        ]);
    }
}
