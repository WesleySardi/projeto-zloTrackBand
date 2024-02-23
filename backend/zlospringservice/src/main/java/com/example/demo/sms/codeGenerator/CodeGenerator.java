package com.example.demo.sms.codeGenerator;

import java.util.Random;

public class CodeGenerator {
    public static String gerarCodigoSMS(int tamanho) {
        StringBuilder codigo = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < tamanho; i++) {
            int digito = random.nextInt(10); // Gere um dígito aleatório de 0 a 9
            codigo.append(digito);
        }

        return codigo.toString();
    }
}
