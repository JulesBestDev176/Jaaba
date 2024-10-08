<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('commandes', function (Blueprint $table) {
            // Ajoutez la colonne 'reference' si elle n'existe pas encore
            if (!Schema::hasColumn('commandes', 'reference')) {
                $table->string('reference', 191)->nullable();
            }
        });

        // Initialiser la colonne reference avec des valeurs uniques
        $orders = DB::table('commandes')->get();
        foreach ($orders as $order) {
            $reference = 'CM' . str_pad($order->id, 6, '0', STR_PAD_LEFT);
            DB::table('commandes')->where('id', $order->id)
                ->update(['reference' => $reference]);
        }

        // Ajouter la contrainte unique
        Schema::table('commandes', function (Blueprint $table) {
            $table->string('reference', 191)->unique()->change(); // Spécifie la longueur
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('commandes', function (Blueprint $table) {
            $table->dropUnique(['reference']);
            $table->dropColumn('reference');
        });
    }
};
