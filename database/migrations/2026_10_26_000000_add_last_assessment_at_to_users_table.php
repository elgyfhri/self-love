<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Kolom ini sudah ada di create_users_table, tetapi database yang dibuat
     * sebelum kolom tersebut ditambahkan belum memilikinya. Migration ini
     * menambahkannya bila belum ada (aman untuk instalasi baru).
     */
    public function up(): void
    {
        if (Schema::hasColumn('users', 'last_assessment_at')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('last_assessment_at')->nullable()->after('password');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('users', 'last_assessment_at')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('last_assessment_at');
        });
    }
};
