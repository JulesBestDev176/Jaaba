<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RetourCommande extends Model
{
    use HasFactory;

    protected $fillable = [
        'commande_id', 'produit_id', 'motif', 'quantitéRetournée', 'statut'
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
