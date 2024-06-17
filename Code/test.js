function
    show_thue_hai_quan(element,
        value,
        check_thue) {

    var
        adasdfasdfa =
            new
                Date();

    var
        loai_thue =
            value;

    arr_show04 = [

        'tkhai_so',

        'ngay_dk',

        'lh_xnk',

        'tlh_xnk',

        'bt_lh_xnk',

        'ma_loaitien',

        'ma_loaitien_select',

    ]

    arr_show031 = [

        'so_tb',

    ]

    arr_show032 = [

        'so_tb',

        'dac_diem_pt',

        'dc_ts',

        'so_may',

        'so_khung',

    ]

    arr_require04 = [

    ]

    arr_require031 = [

        'so_tb',

        'so_qd',

        'ngay_qd',

        'cq_qd',

    ]

    arr_require032 = [

        'so_tb',

        'so_qd',

        'ngay_qd',

        'cq_qd',

        'dac_diem_pt',

        'dc_ts',

        'so_may',

        'so_khung',

    ]

    if (loai_thue ==
        "03-1" &&
        check_thue) {

        for (let
            i =
                0; i <
            arr_show032.length;
            i++) {

            var
                show =
                    element.querySelector('[name=' +
                        arr_show032[i] +
                        ']');

            if (show !=
                null) show.style.display
                    = 'none';

        }

        for (let
            i =
                0; i <
            arr_require032.length;
            i++) {

            var
                show =
                    element.querySelector('[name=' +
                        arr_require032[i] +
                        ']');

            if (show !=
                null) show.placeholder = "
            ";

        }

        for (let
            i =
                0; i <
            arr_show04.length;
            i++) {

            var
                show =
                    element.querySelector('[name=' +
                        arr_show04[i] +
                        ']');

            if (show !=
                null) show.style.display
                    = 'none';

        }

        for (let
            i =
                0; i <
            arr_show031.length;
            i++) {

            var
                show =
                    element.querySelector('[name=' +
                        arr_show031[i] +
                        ']')

            if (show !=
                null) show.style.display
                    = "";

        }

        for (let
            i =
                0; i <
            arr_require031.length;
            i++) {

            var
                show =
                    element.querySelector('[name=' +
                        arr_require031[i] +
                        ']');

            if (show !=
                null) {

                show.placeholder = "";

                show.onblur();

            }

        }

    }

    else
        if (loai_thue ==
            "03-2" &&
            check_thue) {

            for (let
                i =
                    0; i <
                arr_show031.length;
                i++) {

                var
                    show =
                        element.querySelector('[name=' +
                            arr_show031[i] +
                            ']');

                if (show !=
                    null) show.style.display
                        = 'none';

            }

            for (let
                i =
                    0; i <
                arr_require031.length;
                i++) {

                var
                    show =
                        element.querySelector('[name=' +
                            arr_require031[i] +
                            ']');

                if (show !=
                    null) show.placeholder = "
                ";

            }

            for (let
                i =
                    0; i <
                arr_show04.length;
                i++) {

                var
                    show =
                        element.querySelector('[name=' +
                            arr_show04[i] +
                            ']');

                if (show !=
                    null) show.style.display
                        = 'none';

            }

            for (let
                i =
                    0; i <
                arr_show032.length;
                i++) {

                var
                    show =
                        element.querySelector('[name=' +
                            arr_show032[i] +
                            ']')

                if (show !=
                    null) show.style.display
                        = "";

            }

            for (let
                i =
                    0; i <
                arr_require032.length;
                i++) {

                var
                    show =
                        element.querySelector('[name=' +
                            arr_require032[i] +
                            ']');

                if (show !=
                    null) {

                    show.placeholder = "";

                    show.onblur();

                }

            }

        }

        else
            if (loai_thue ==
                "04" &&
                check_thue) {

                for (let
                    i =
                        0; i <
                    arr_show031.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_show031[i] +
                                ']');

                    if (show !=
                        null) show.style.display
                            = 'none';

                }

                for (let
                    i =
                        0; i <
                    arr_require031.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_require031[i] +
                                ']');

                    if (show !=
                        null) show.placeholder = "
                    ";

                }

                for (let
                    i =
                        0; i <
                    arr_show032.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_show032[i] +
                                ']');

                    if (show !=
                        null) show.style.display
                            = 'none';

                }

                for (let
                    i =
                        0; i <
                    arr_require032.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_require032[i] +
                                ']');

                    if (show !=
                        null) show.placeholder = "
                    ";

                }

                for (let
                    i =
                        0; i <
                    arr_show04.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_show04[i] +
                                ']')

                    if (show !=
                        null) show.style.display
                            = "";

                }

            }

            else {

                for (let
                    i =
                        0; i <
                    arr_show04.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_show04[i] +
                                ']');

                    if (show !=
                        null) show.style.display
                            = 'none';

                }

                for (let
                    i =
                        0; i <
                    arr_show031.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_show031[i] +
                                ']');

                    if (show !=
                        null) show.style.display
                            = 'none';

                    if (show !=
                        null) show.placeholder = "
                    ";

                }

                for (let
                    i =
                        0; i <
                    arr_require031.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_require031[i] +
                                ']');

                    if (show !=
                        null) show.placeholder = "
                    ";

                }

                for (let
                    i =
                        0; i <
                    arr_show032.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_show031[i] +
                                ']');

                    if (show !=
                        null) show.style.display
                            = 'none';

                    if (show !=
                        null) show.placeholder = "
                    ";

                }

                for (let
                    i =
                        0; i <
                    arr_require032.length;
                    i++) {

                    var
                        show =
                            element.querySelector('[name=' +
                                arr_require032[i] +
                                ']');

                    if (show !=
                        null) show.placeholder = "
                    ";

                }

            }

    console.log(1, (new
        Date() -
        currentTimeLog) - (adasdfasdfa -
            currentTimeLog));

}
