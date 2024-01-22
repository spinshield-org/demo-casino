<?php

return [
  'register_bonus' => [
    'enabled' => false,
    'amount' => 750,
    'currency' => 'usd',
  ],
  'cdnServers' => [
    env('SPINSHIELD_CDN_0', "https://cdn2.softswiss.net/i/s3/"),
    env('SPINSHIELD_CDN_1', "https://client.zeroggr.com/host/img/s3/"),
    env('SPINSHIELD_CDN_2', "https://cdn2.softswiss.net/i/s4/"),
  ],
  'promocode' => [
    'balance' => [
      "enabled" => true,
      "code" => env("PROMOCODE_BALANCE", 'CASHREFILL'),
    ],
    'freespins' => [
      "enabled" => true,
      "code" => env("PROMOCODE_FREESPINS", 'FREESPINS'),
    ],
  ],
  'api' => [
      "api_login" => env('SPINSHIELD_API_LOGIN', ''),
      "api_password" => env('SPINSHIELD_API_PASSWORD', ''),
      "salt_key" => env("SPINSHIELD_SALT_KEY", ''),
      "endpoint" => env("SPINSHIELD_ENDPOINT", 'https://seamless.mercuryplay.com/api/system/operator'),
  ],
];